import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const crmApi = createApi({
  reducerPath: 'crmApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/crm/' }),
  tagTypes: [
    'SingaporeTransfer',
    'CrossBorderTransfer',
    'SingaporeTour',
    'MalaysiaTour',
    'SingaporeAttraction'
  ],
  endpoints: (builder) => ({
    getSingaporeTransfers: builder.query<any, void>({
      query: () => 'singapore-transfers',
      providesTags: ['SingaporeTransfer'],
    }),
    saveSingaporeTransfer: builder.mutation<any, { id?: string; data: any }>({
      query: ({ id, data }) => ({
        url: id ? `singapore-transfers/${id}` : 'singapore-transfers',
        method: id ? 'PUT' : 'POST',
        body: data,
      }),
      invalidatesTags: ['SingaporeTransfer'],
    }),
    deleteSingaporeTransfer: builder.mutation<any, string>({
      query: (id) => ({
        url: `singapore-transfers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SingaporeTransfer'],
    }),

    getCrossBorderTransfers: builder.query<any, void>({
      query: () => 'cross-border-transfers',
      providesTags: ['CrossBorderTransfer'],
    }),
    saveCrossBorderTransfer: builder.mutation<any, { id?: string; data: any }>({
      query: ({ id, data }) => ({
        url: id ? `cross-border-transfers/${id}` : 'cross-border-transfers',
        method: id ? 'PUT' : 'POST',
        body: data,
      }),
      invalidatesTags: ['CrossBorderTransfer'],
    }),
    deleteCrossBorderTransfer: builder.mutation<any, string>({
      query: (id) => ({
        url: `cross-border-transfers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CrossBorderTransfer'],
    }),

    getSingaporeTours: builder.query<any, void>({
      query: () => 'singapore-tours',
      providesTags: ['SingaporeTour'],
    }),
    saveSingaporeTour: builder.mutation<any, { id?: string; data: any }>({
      query: ({ id, data }) => ({
        url: id ? `singapore-tours/${id}` : 'singapore-tours',
        method: id ? 'PUT' : 'POST',
        body: data,
      }),
      invalidatesTags: ['SingaporeTour'],
    }),
    deleteSingaporeTour: builder.mutation<any, string>({
      query: (id) => ({
        url: `singapore-tours/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SingaporeTour'],
    }),

    getMalaysiaTours: builder.query<any, void>({
      query: () => 'malaysia-tours',
      providesTags: ['MalaysiaTour'],
    }),
    saveMalaysiaTour: builder.mutation<any, { id?: string; data: any }>({
      query: ({ id, data }) => ({
        url: id ? `malaysia-tours/${id}` : 'malaysia-tours',
        method: id ? 'PUT' : 'POST',
        body: data,
      }),
      invalidatesTags: ['MalaysiaTour'],
    }),
    deleteMalaysiaTour: builder.mutation<any, string>({
      query: (id) => ({
        url: `malaysia-tours/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MalaysiaTour'],
    }),

    getSingaporeAttractions: builder.query<any, void>({
      query: () => 'singapore-attractions',
      providesTags: ['SingaporeAttraction'],
    }),
    saveSingaporeAttraction: builder.mutation<any, { id?: string; data: any }>({
      query: ({ id, data }) => ({
        url: id ? `singapore-attractions/${id}` : 'singapore-attractions',
        method: id ? 'PUT' : 'POST',
        body: data,
      }),
      invalidatesTags: ['SingaporeAttraction'],
    }),
    deleteSingaporeAttraction: builder.mutation<any, string>({
      query: (id) => ({
        url: `singapore-attractions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SingaporeAttraction'],
    }),
  }),
});

export const {
  useGetSingaporeTransfersQuery,
  useSaveSingaporeTransferMutation,
  useDeleteSingaporeTransferMutation,
  useGetCrossBorderTransfersQuery,
  useSaveCrossBorderTransferMutation,
  useDeleteCrossBorderTransferMutation,
  useGetSingaporeToursQuery,
  useSaveSingaporeTourMutation,
  useDeleteSingaporeTourMutation,
  useGetMalaysiaToursQuery,
  useSaveMalaysiaTourMutation,
  useDeleteMalaysiaTourMutation,
  useGetSingaporeAttractionsQuery,
  useSaveSingaporeAttractionMutation,
  useDeleteSingaporeAttractionMutation,
} = crmApi;
