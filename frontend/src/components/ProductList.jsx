import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';

const url = 'http://localhost:5000/products/';
const fetcher = (...args) => axios.get(...args).then((res) => res.data);

const ProductList = () => {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(url, fetcher);

  if (error)
    return (
      <div className='h-screen w-screen flex items-center justify-center text-black'>
        <p>Failed loading the data.</p>
      </div>
    );
  if (!error && !data)
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    );

  const deleteProduct = async (productId) => {
    await axios.delete(url + productId);
    mutate(url);
  };

  return (
    <div className='container'>
      <div className='flex flex-col mt-5'>
        <div className='w-full'>
          <Link
            to='/add'
            className='bg-blue-700 hover:bg-blue-900 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg'
          >
            Add New
          </Link>
          <div className='relative shadow rounded-lg mt-3'>
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                <tr>
                  <th className='py-3 px-1 text-center'>No</th>
                  <th className='py-3 px-6'>Product Name</th>
                  <th className='py-3 px-6'>Price</th>
                  <th className='py-3 px-1 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product, index) => (
                  <tr className='bg-white border-b' key={product.id}>
                    <td className='py-3 px-1 text-center'>{index + 1}</td>
                    <td className='py-3 px-6 font-medium text-gray-900'>
                      {product.name}
                    </td>
                    <td className='py-3 px-6'>{product.price}</td>
                    <td className='py-3 px-1 text-center'>
                      <Link
                        to={`/edit/${product.id}`}
                        className='font-medium bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded text-white mr-1'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className='font-medium bg-red-500 hover:bg-red-700 py-1 px-3 rounded text-white'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
