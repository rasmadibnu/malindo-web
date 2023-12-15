export const formatRupiah = (value: unknown): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(parseInt(value));
};
