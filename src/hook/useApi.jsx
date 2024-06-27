import React, { useState } from "react";

const useApi = (fun) => {
  const [apiData, setApiData] = useState({
    loading: false,
    error: null,
    data: null,
  });
  const dealingApi = async (formData) => {
    setApiData((pre) => ({ ...pre, loading: true }));
    const res = await fun(formData);
    console.log(res);
    if (res.error) {
      setApiData((pre) => ({ ...pre, loading: false, error: res.msg }));
    } else {
      setApiData((pre) => ({ ...pre, loading: false, data: res.data }));
    }
  };
  const { loading, error, data } = apiData;
  return {dealingApi, loading, error, data };
};

export default useApi;
