import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51MQc09EYhE4YR7NL3KHNYWh2qitJEAjfM6yfaXGd1C3wOqiUgou2nN0PdjvKB2di4LAbFfGSWY4OfyPBqlabmb0M00Bl6Krbra'
  );
  try {
    // 1) Get checkout session from API
    const session = await axios(`http://127.0.0.1:3000/api/v1/booking/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};