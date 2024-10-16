import axios from "axios";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const live = "http://localhost:4001";

export const hostedAuthAxios = axios.create({
  baseURL: `${live}/auth`,
});

export const hostedSellerAuthAxios = axios.create({
  baseURL: `${live}/seller-auth`,
});

export const hostedPermissionAxios = axios.create({
  baseURL: `${live}/permission`,
});

export const hostedProductAxios = axios.create({
  baseURL: `${live}/product`,
});
export const hostedSellerProductAxios = axios.create({
  baseURL: `${live}/sellerProduct`,
});

export const hostedCategoryAxios = axios.create({
  baseURL: `${live}/category`,
});

export const hostedCouponAxios = axios.create({
  baseURL: `${live}/coupon`,
});
export const hostedForumCategoryAxios = axios.create({
  baseURL: `${live}/forum`,
});

export const hostedOrderAxios = axios.create({
  baseURL: `${live}/seller-order`,
});
export const hostedPagesAxios = axios.create({
  baseURL: `${live}`,
});
export const hostedNewsletter = axios.create({
  baseURL: `${live}/news-letter`,
});
export const hostedCommonModule = axios.create({
  baseURL: `${live}/common`,
});
export const hostedBulkOrder = axios.create({
  baseURL: `${live}/bulk-order`,
});
export const hostedRatingReview = axios.create({
  baseURL: `${live}/feedback/ratingandreview`,
});

export function useQuery() {
  const { search } = useLocation();
  // return new URLSearchParams(search)
  return useMemo(() => new URLSearchParams(search), [search]);
}
