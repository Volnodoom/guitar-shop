import { createAsyncThunk} from '@reduxjs/toolkit';
import { ApiAction, ApiRoutes, LIMIT_GUITARS_PER_PAGE, HEADER_TOTAL_NUMBER, NameSpace, QueryRoutes, ONE, COUPLED_DATA, SortingSort, SortingOrder, NEGATIVE_ONE } from '../../const';
import { handleError } from '../../services/handle-error';
import { CoupledProductData, GeneralApiConfig, GuitarType } from '../../types/general.types';
import { getValueFromNonEmptyArray, separateGuitarAndReviews } from '../../utils/utils-components';
import { setReviews } from '../data-reviews/data-reviews';
import { setGuitarsDetails, setGuitarsIdPerPage, setOneGuitarDetails, setPriceExtremes, setTotalGuitars, setUserSearch } from './data-guitars';

//params are crucial because only hare we spread data into slices with limit
//(setGuitarsIdPerPage it is sets how many products will be displayed)
//no where in the code we control this number and relying on server response
export const fetchProductsAction = createAsyncThunk<void, undefined, GeneralApiConfig>(
  ApiAction.FetchGuitars,
  async (_arg, {dispatch, getState, extra: api}) => {
    try{
      const response = await api.get<CoupledProductData[]>(ApiRoutes.Guitars, {
        params: {
          [QueryRoutes.Start]: getState()[NameSpace.QueryParams].itemRangeStart,
          [QueryRoutes.Limit]: LIMIT_GUITARS_PER_PAGE,
          [QueryRoutes.Sort]: getState()[NameSpace.QueryParams].sortBy,
          [QueryRoutes.Order]: getState()[NameSpace.QueryParams].orderBy,
          [QueryRoutes.PriceStart]: getState()[NameSpace.QueryParams].priceRangeStart,
          [QueryRoutes.PriceEnd]: getState()[NameSpace.QueryParams].priceRangeEnd,
          [QueryRoutes.StringNumber]: getValueFromNonEmptyArray(getState()[NameSpace.QueryParams].filterByString),
          [QueryRoutes.Type]: getValueFromNonEmptyArray(getState()[NameSpace.QueryParams].filterByType),
          [QueryRoutes.Embed]: COUPLED_DATA,
        }
      });

      dispatch(setTotalGuitars(Number(response.headers[HEADER_TOTAL_NUMBER])));

      const {guitars, reviews} = separateGuitarAndReviews(response.data);
      dispatch(setGuitarsDetails(guitars));
      dispatch(setGuitarsIdPerPage(guitars));

      dispatch(setReviews(reviews));
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const fetchUserSearchAction = createAsyncThunk<void, string, GeneralApiConfig>(
  ApiAction.FetchUserSearch,
  async (searchName, {dispatch, getState, extra: api}) => {
    try{
      const {data} = await api.get<GuitarType[]>(ApiRoutes.Guitars, {
        params: {
          [QueryRoutes.Like]: searchName,
        }
      });

      dispatch(setUserSearch(data));
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const fetchOneGuitarAction = createAsyncThunk<void, number, GeneralApiConfig>(
  ApiAction.FetchOneGuitar,
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<GuitarType>(ApiRoutes.Guitar(id));
      dispatch(setOneGuitarDetails(data));
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);

export const fetchPriceExtreme = createAsyncThunk<void, undefined, GeneralApiConfig>(
  ApiAction.FetchPrice,
  async (_arg, {dispatch, getState, extra: api}) => {
    try{
      const minPrice = api.get<GuitarType[]>(ApiRoutes.Guitars, {
        params: {
          [QueryRoutes.Start]: 0,
          [QueryRoutes.Limit]: ONE,
          [QueryRoutes.Sort]: SortingSort.Price,
          [QueryRoutes.Order]: SortingOrder.Increase,
          [QueryRoutes.StringNumber]: getValueFromNonEmptyArray(getState()[NameSpace.QueryParams].filterByString),
          [QueryRoutes.Type]: getValueFromNonEmptyArray(getState()[NameSpace.QueryParams].filterByType),
        }
      });

      const maxPrice = api.get<GuitarType[]>(ApiRoutes.Guitars, {
        params: {
          [QueryRoutes.Start]: 0,
          [QueryRoutes.Limit]: ONE,
          [QueryRoutes.Sort]: SortingSort.Price,
          [QueryRoutes.Order]: SortingOrder.Decrease,
          [QueryRoutes.StringNumber]: getValueFromNonEmptyArray(getState()[NameSpace.QueryParams].filterByString),
          [QueryRoutes.Type]: getValueFromNonEmptyArray(getState()[NameSpace.QueryParams].filterByType),
        }
      });

      const [responseMinPrice, responseMaxPrice] = await Promise.all([minPrice, maxPrice]);

      if(responseMinPrice.data.length === 0 || responseMaxPrice.data.length === 0) {
        dispatch(setPriceExtremes({ min: NEGATIVE_ONE, max: NEGATIVE_ONE }));
      } else {
        const resultMinMax = {
          min: responseMinPrice.data[0].price,
          max: responseMaxPrice.data[0].price,
        };

        dispatch(setPriceExtremes(resultMinMax));
      }
    } catch (error) {
      handleError(error);
      throw error;
    }
  }
);
