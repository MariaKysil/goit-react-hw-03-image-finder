import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { SearchBar } from '../Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ErrorView } from 'components/Error/Error';
import { LoadMoreButton } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import css from './App.module.css';
import { fetchImage } from 'api';

export class App extends Component {
  state = {
    searchText: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(_, prevState) {
    const prevStateText = prevState.searchText;
    const nextStateText = this.state.searchText;

    if (prevStateText !== nextStateText) {
      this.setState({ status: 'pending' });
      this.fetchImages();
    }
  }

  handleFormSubmit = searchText => {
    this.setState({ searchText, page: 1, images: [], error: null });
  };

  fetchImages = () => {
    const { searchText, page } = this.state;

    fetchImage(searchText, page)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
          status: 'resolved',
        }));
      })
      .catch(error => {
        this.setState({ error, status: 'rejected' });
      });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = event => {
    if (event.target.nodeName === 'IMG') {
      this.toggleModal();
    }

    const targetImg = this.state.images.find(
      ({ id }) => id === Number(event.target.id)
    );
    this.setState({ largeImage: targetImg.largeImageURL });
  };

  render() {
    const { status, error, images, showModal } = this.state;

    if (status === 'idle') {
      return (
        <div className={css.app}>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ToastContainer />
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className={css.app}>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <div className={css.loader}>
            <Loader />
          </div>
        </div>
      );
    }

    if (status === 'rejected') {
      return <ErrorView message={error.message}></ErrorView>;
    }

    if (status === 'resolved') {
      return (
        <div className={css.app}>
          <SearchBar onSubmit={this.handleFormSubmit} />
          <ImageGallery
            images={this.state.images}
            onClick={this.onOpenModal}
          ></ImageGallery>
          {showModal && (
            <Modal
              largeImage={this.state.largeImage}
              images={this.state.images}
              onClick={this.toggleModal}
            />
          )}
          {images.length > 0 && <LoadMoreButton onClick={this.fetchImages} />}
        </div>
      );
    }
  }
}
