import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import queryString from 'query-string';
import { VerticalCard } from 'components';

export default function SearchScreen({ searchData, query, lastPage, currentPage }) {
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchState, setSearchState] = useState(
    {
      ...query,
      page: 1,
      limit: 12,
      category: query?.category,
    }
  );
    
  const handleSearch = (searchState) => {
    const href = queryString.stringify(searchState, {
      encode: false,
      skipNulls: true,
      skipEmptyString: true
    })
    router.push(`/search?${href}`)
    setSearchState(searchState)
  }

  const handleFilters = (filter, queryData) => {
    handleSearch({ ...searchState, [filter]: queryData ? queryData : null, page: 1 })
  }

  const handleOrder = (filters) => {
    handleSearch({ ...searchState, ...filters, page: 1 })
  }

  const handlePage = (event, page) => {
    handleSearch({ ...searchState, page })
  };

  const aniStart = () => {
    setLoading(true);
  };
  const aniEnd = () => {
    setLoading(false);
  };
  useEffect(() => {
    router.events.on("routeChangeStart", aniStart);
    router.events.on("routeChangeComplete", aniEnd);
    router.events.on("routeChangeError", aniEnd);

    return () => {
      router.events.off("routeChangeStart", aniStart);
      router.events.off("routeChangeComplete", aniEnd);
      router.events.off("routeChangeError", aniEnd);
    };
  }, [router]);

  return (
    <>
    <Card sx={{ mt: -10, borderRadius: 4 }}>
        <CardHeader
          title="جستجو"
          action={
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Button
                color={searchState.orderby === "discount_percent" ? "secondary" : "inherit"}
                onClick={()=>{
                  handleOrder({
                    "orderby": "discount_percent",
                    "orderBy_direction": null,
                  })
                }}
                variant="contained">بیشترین درصد تخفیف</Button>
              <Button
                color={searchState.orderby === "discount_value" ? "secondary" : "inherit"}
                onClick={()=>{
                  handleOrder({
                    "orderby": "discount_value",
                    "orderBy_direction": null,
                  })
                }}
                variant="contained">بیشترین مقدار تخفیف</Button>
              <Button
                color={searchState.orderby === "me_price" && searchState.orderBy_direction === "DESC" ? "secondary" : "inherit"}
                onClick={()=>{
                  handleOrder({
                    "orderby": "me_price",
                    "orderBy_direction": "DESC",
                  })
                }}
                variant="contained">گرانترین</Button>
              <Button
                color={searchState.orderby === "me_price" && searchState.orderBy_direction === "ASC" ? "secondary" : "inherit"}
                onClick={()=>{
                  handleOrder({
                    "orderby": "me_price",
                    "orderBy_direction": "ASC",
                  })
                }}
                variant="contained">ارزانترین</Button>
            </Stack>
          }
        />
        <CardContent>
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap" rowGap={2} columnGap={2}>
            {
              loading
              ?
              [0,1,2,3,4,5,7,8,9,10,11].map( item => (
                <Skeleton key={item} animation="wave" variant="rectangular" sx={{ width: 320, height: 485, borderRadius: 3 }} />
              ))
              :
              searchData && searchData.map( item => (
                <VerticalCard
                  key={item.id}
                  itemId = {item.id}
                  shop = {item.shop}
                  co_price = {item.co_price}
                  me_price = {item.me_price}
                  attributes = {item.attributes}
                  product_info = {item.product_info}
                  discount_percent = {item.discount_percent}
                />
              ))
            }
          </Stack>

          <Stack alignItems="center" justifyContent="center" py={4} px="auto">
            <Pagination
              dir="rtl"
              size='small'
              color="secondary"
              variant="outlined"
              count={lastPage || 0}
              page={currentPage || 1}
              onChange={handlePage}
              boundaryCount={1}
            />
          </Stack>

        </CardContent>
      </Card>
      
    </>
  );
}
