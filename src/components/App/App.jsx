import { Component } from 'react';

import * as API from 'components/services/FetchAPI.js';
import Button from '../Button';
import Loader from '../helpers/Loader';
import { NotificationContainer, notifyWarning } from '../helpers/notification';
import ImageGallery from '../ImageGallery';
import Searchbar from '../Searchbar';
import Title from '../Title';
import { Container } from './App.styled';

class App extends Component {
  state = {
    items: [],
    query: '',
    page: 1,
    status: 'pending',
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ status: 'load' });

        const images = await API.getImages({ query, page });

        if (images.totalHits === 0) {
          this.setState({ status: 'notFound' });
          return notifyWarning(
            `Sorry, nothing was found on request "${query}"`
          );
        }

        this.setState(({ items }) => ({
          items: [...items, ...images.hits],
        }));

        // Скорее всего костыль,  потом пофиксить
        setTimeout(() => {
          console.log(this.state.items.length);
          this.setState({
            status:
              images.totalHits > this.state.items.length
                ? 'loadMore'
                : 'noMore',
          });
        }, 10);
      } catch (error) {
        this.setState({ status: error.message });
        return notifyWarning(error.message);
      }
    }
  }

  handelSabmitForm = value => {
    this.setState({ query: value, page: 1, items: [] });
  };

  increasePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { status } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handelSabmitForm} />
        <ImageGallery items={this.state.items} />

        {(status === 'pending' && (
          <Title>Let's find whatever you want !</Title>
        )) ||
          (status === 'notFound' && <Title>Try again !</Title>)}

        {status === 'load' && <Loader />}
        {status === 'loadMore' && <Button onClick={this.increasePage} />}

        <NotificationContainer />
      </Container>
    );
  }
}

export default App;
