const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');


exports.getOverview = catchAsync(async (req, res,next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();


  // 2) Build template

  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour(including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('No tour found!', 404));
  }

  // 2) Build template

  // 3) Render template using data from 1)
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.mapbox.com https://*.stripe.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour: tour,
    });
});

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' http://127.0.0.1:3000/"
    )
    .render('login', {
      title: 'Login',
    });
};

exports.getSignupForm = (req,res)=> {
  res.status(200).render('signup', {
    title: `Create New Account`,
  });
}

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: `Your Account`,
  });
};

exports.getMyTours = catchAsync(async(req,res,next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id } )


  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map(el => el.tour)
  const tours = await Tour.find({ _id: {$in: tourIDs}});

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  })
})


