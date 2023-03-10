const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");
const EnrolledUsers = require("../models/EnrolledUsers");
const geocoder = require("../utils/geocoder");
const { cloudinary } = require("../config/cloudinary");

// @ desc Get all bootcamps
// @ route GET /api/v1/bootcamps
// @ access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @ desc Get single bootcamp
// @ route GET /api/v1/bootcamps/:id
// @ access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @ desc Create new bootcamp
// @ route POST /api/v1/bootcamps
// @ access Private

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Check for published bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one bootcamp
  if (publishedBootcamp && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a bootcamp`,
        400
      )
    );
  }

  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @ desc Update bootcamp
// @ route PUT /api/v1/bootcamps/:id
// @ access Private

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @ desc Delete bootcamp
// @ route DELETE /api/v1/bootcamps/:id
// @ access Private

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  bootcamp.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @ desc Get bootcamps within a radius
// @ route GET /api/v1/bootcamps/radius/:zipcode/:distance
// @ access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  }).populate({
    path: "user",
    select: "name",
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @ desc Upload photo for bootcamp
// @ route PUT /api/v1/bootcamps/:id/photo
// @ access Private

exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  const profile = req.files.file.tempFilePath;
  console.log(profile);
  const uploadProfile = await cloudinary.uploader.upload(profile, {
    upload_preset: "bootcamper",
  });
  console.log(uploadProfile);
  bootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    { photo: uploadProfile.secure_url },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @ desc Get user enrolled in bootcamp
// @ route GET /api/v1/bootcamps/:id/enroll

exports.enrollBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // user should not be a publisher
  if (req.user.role === "publisher") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to enroll in this bootcamp`,
        401
      )
    );
  }

  // check if user is already enrolled
  let enrolledUser = await EnrolledUsers.findOne({
    user: req.user.id,
    bootcamp: req.params.id,
  });

  if (enrolledUser) {
    return next(new ErrorResponse(`User already enrolled in bootcamp`, 400));
  }

  enrolledUser = await EnrolledUsers.create({
    user: req.user.id,
    bootcamp: req.params.id,
  });

  res.status(200).json({
    success: true,
    data: enrolledUser,
  });
});

// @ desc Check if user is enrolled in bootcamp
// @ route GET /api/v1/bootcamps/:id/checkenroll

exports.checkEnrollBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  // user should not be a publisher
  if (req.user.role === "publisher") {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to enroll in this bootcamp`,
        401
      )
    );
  }

  // check if user is already enrolled
  let enrolledUser = await EnrolledUsers.findOne({
    user: req.user.id,
    bootcamp: req.params.id,
  });

  if (!enrolledUser) {
    return res.status(200).json({
      success: true,
      data: false,
    });
  }

  res.status(200).json({
    success: true,
    data: true,
  });
});
