import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

// SubCategories
export const getSubCategory = async () => axios.get('/subcategories');
export const getSubCategoryForId = async (id) => {
  axios.get(`/subcategories/${id}`);
};
export const addSubCategory = async (subcategory) => {
  axios.post('/subcategories', subcategory);
};
export const updateSubCategory = async (subcategory) => {
  axios.put(`/subcategories/${subcategory.id}`, subcategory);
};
export const removeSubCategory = async (id) => {
  axios.delete(`/subcategories/${id}`);
};

// Channels
export const getChannel = async () => axios.get('/channels');
export const getChannelyForId = async (id) => {
  axios.get(`/channels/${id}`);
};
export const addChannel = async (channel) => {
  axios.post('/channels', channel);
};
export const updateChannel = async (channel) => {
  axios.put(`/channels/${channel.id}`, channel);
};
export const removeChannel = async (id) => {
  axios.delete(`/channels/${id}`);
};

// SubChannels
export const getSubChannel = async () => axios.get('/subchannels');
export const getSubChannelyForId = async (id) => {
  axios.get(`/subchannels/${id}`);
};
export const addSubChannel = async (subchannel) => {
  axios.post('/subchannels', subchannel);
};
export const updateSubChannel = async (subchannel) => {
  axios.put(`/subchannels/${subchannel.id}`, subchannel);
};
export const removeSubChannel = async (id) => {
  axios.delete(`/subchannels/${id}`);
};

// PaymentMethods
export const getPaymentMethod = async () => axios.get('/payment-methods');
export const getPaymentMethodForId = async (id) => {
  axios.get(`/payment-methods/${id}`);
};
export const addPaymentMethod = async (paymentMethod) => {
  axios.post('/payment-methods', paymentMethod);
};
export const updatePaymentMethod = async (paymentMethod) => {
  axios.put(`/payment-methods/${paymentMethod.id}`, paymentMethod);
};
export const removePaymentMethod = async (id) => {
  axios.delete(`/payment-methods/${id}`);
};

// PaymentMethodDetails
export const getPaymentMethodDetail = async () =>
  axios.get('/payment-method-details');
export const getPaymentMethodDetailForId = async (id) => {
  axios.get(`/payment-method-details/${id}`);
};
export const addPaymentMethodDetail = async (paymentMethodDetail) => {
  axios.post('/payment-method-details', paymentMethodDetail);
};
export const updatePaymentMethodDetail = async (paymentMethodDetail) => {
  axios.put(
    `/payment-method-details/${paymentMethodDetail.id}`,
    paymentMethodDetail
  );
};
export const removePaymentMethodDetail = async (id) => {
  axios.delete(`/payment-method-details/${id}`);
};

// Customers
export const getCustomer = async () => axios.get('/customers');
export const getCustomerForId = async (id) => {
  axios.get(`/customers/${id}`);
};
export const addCustomer = async (customer) => {
  axios.post('/customers', customer);
};
export const updateCustomer = async (customer) => {
  axios.put(`/customers/${customer.id}`, customer);
};
export const removeCustomer = async (id) => {
  axios.delete(`/customers/${id}`);
};

// Giftcards
export const getGiftcard = async () => axios.get('/giftcards');
export const getGiftcardForId = async (id) => {
  axios.get(`/giftcards/${id}`);
};
export const addGiftcard = async (giftcard) => {
  axios.post('/giftcards', giftcard);
};
export const updateGiftcard = async (giftcard) => {
  axios.put(`/giftcards/${giftcard.id}`, giftcard);
};
export const removeGiftcard = async (id) => {
  axios.delete(`/giftcards/${id}`);
};

// Discounts
export const getDiscount = async () => axios.get('/discounts');
export const getDiscountForId = async (id) => {
  axios.get(`/discounts/${id}`);
};
export const addDiscount = async (discount) => {
  axios.post('/discounts', discount);
};
export const updateDiscount = async (discount) => {
  axios.put(`/discounts/${discount.id}`, discount);
};
export const removeDiscount = async (id) => {
  axios.delete(`/discounts/${id}`);
};

// Restaurants
export const getRestaurant = async () => axios.get('/restaurants');
export const getRestaurantForId = async (id) => {
  axios.get(`/restaurants/${id}`);
};
export const addRestaurant = async (restaurant) => {
  axios.post('/restaurants', restaurant);
};
export const updateRestaurant = async (restaurant) => {
  axios.put(`/restaurants/${restaurant.id}`, restaurant);
};
export const removeRestaurant = async (id) => {
  axios.delete(`/restaurants/${id}`);
};

// Brands
export const getBrand = async () => axios.get('/brands');
