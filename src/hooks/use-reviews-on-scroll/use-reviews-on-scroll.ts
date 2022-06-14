import { useEffect } from 'react';
import { SCROLL_LIMIT } from '../../const';

export const useReviewsOnScroll = (
  showNumberOfReviews: number,
  numberOfReviews: number,
  callback: () => void,
) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = document.documentElement.clientHeight;
      const scrollTop = window.scrollY;

      const scrollBottom = scrollHeight - windowHeight - scrollTop;

      if (scrollBottom < SCROLL_LIMIT && showNumberOfReviews < numberOfReviews) {
        callback();
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, numberOfReviews, showNumberOfReviews]);

};
