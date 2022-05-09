import { useEffect } from 'react';
import { Review } from '../../types/general.types';

export const useReviewsOnScroll = (
  showOffLimit: number,
  filtratedReviews: Review[],
  callback: () => void,
) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = document.documentElement.clientHeight;
      const scrollTop = window.pageYOffset;

      const scrollBottom = scrollHeight - windowHeight - scrollTop;

      if (scrollBottom < 280 && showOffLimit < filtratedReviews.length) {
        callback();
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, filtratedReviews.length, showOffLimit]);

};
