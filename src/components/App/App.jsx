import { getImages } from 'components/services/FetchAPI';
import { useEffect, useState } from 'react';

import Button from '../Button';
import Loader from '../helpers/Loader';
import { NotificationContainer, notifyWarning } from '../helpers/notification';
import ImageGallery from '../ImageGallery';
import Searchbar from '../Searchbar';
import Title from '../Title';
import { Container } from './App.styled';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (searchQuery === '') return;

    try {
      setStatus('load');
      getImages({ query: searchQuery, page: currentPage }).then(response => {
        if (response.totalHits === 0) {
          setStatus('notFound');
          return notifyWarning(
            `Sorry, nothing was found on request "${searchQuery}"`
          );
        }

        setImages(state => [...state, ...response.hits]);

        if (response.hits.length < 12 || response.total < 12) {
          return setStatus('noMore');
        }
        setStatus('loadMore');
      });
    } catch (error) {
      setStatus(error.message);
      notifyWarning(error.message);
    }
  }, [currentPage, searchQuery]);

  const handelSubmitForm = value => {
    setSearchQuery(value);
    setCurrentPage(1);
    setImages([]);
  };

  const increasePage = () => {
    setCurrentPage(page => page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handelSubmitForm} />
      <ImageGallery items={images} />

      {(status === 'pending' && (
        <Title>Let's find whatever you want !</Title>
      )) ||
        (status === 'notFound' && <Title>Try again !</Title>)}

      {status === 'load' && <Loader />}
      {status === 'loadMore' && <Button onClick={increasePage} />}

      <NotificationContainer />
    </Container>
  );
};

export default App;
