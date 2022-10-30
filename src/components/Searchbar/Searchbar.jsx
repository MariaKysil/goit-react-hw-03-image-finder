import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  state = {
    searchText: '',
  };

  handleNameChange = event => {
    const { value } = event.currentTarget;

    this.setState({ searchText: value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { searchText } = this.state;

    if (searchText.trim() === '') {
      toast.error('Please enter what you are looking for');
      return;
    }

    this.props.onSubmit(searchText);

    this.setState({ searchText: '' });
  };

  render() {
    const { searchText } = this.state;

    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchText}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
