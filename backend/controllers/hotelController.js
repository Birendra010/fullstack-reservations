
import hotelModel from "../models/Hotel.js";
import roomModel from "../models/Room.js";


// create hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new hotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// update hotels
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await hotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};
// delete hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

// get hotel by hotel id
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// get all hotels
// export const getHotels = async (req, res, next) => {
//   const { min, max, ...others } = req.query;
//   try {
//     const hotels = await hotelModel
//       .find({
//         ...others,
//         cheapestPrice:{$gt:min | 1 ,$lt:max ||10000 }
//       })

//     res.status(200).json(hotels);
//   } catch (err) {
//     next(err);
//   }
// };

export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;
  // let limit = +req.query.limit
  // console.log(typeof limit);
  try {
    const hotels = await hotelModel
      .find({
        ...others,
        cheapestPrice: { $gte: min | 1, $lte: max || 100000 },
      })
      .limit(+limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotelModel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotelModel.countDocuments({ type: "hotel" });
    const apartmentCount = await hotelModel.countDocuments({
      type: "apartment",
    });
    const resortCount = await hotelModel.countDocuments({ type: "resort" });
    const villaCount = await hotelModel.countDocuments({ type: "villa" });
    const cabinCount = await hotelModel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);

    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return roomModel.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};