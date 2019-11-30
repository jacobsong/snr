const Tutor = require("../models/Tutors");
const Staff = require("../models/Staff");


const getStaff = async (roleCd) => {
  try {
    if (roleCd < 1 || roleCd > 4) {
      return { error: "Invalid rolecd" };
    }

    const staff = await Staff.find({ roleCd: roleCd }).select("-_id discordName discordAvatar roleCd").lean();
    
    if (staff) {
      return staff;
    }
    
    return { error: "Profile not found" };
  } catch {
    return { error: "Database find failed" };
  }
}


const getTutors = async () => {
  try {
    const tutors = await Tutor.find().select("-_id charName tutors").lean();
    if (tutors) {
      return tutors;
    }
    return { error: "Profile not found" };
  } catch {
    return { error: "Database find failed" };
  }
}


module.exports = {
  getStaff,
  getTutors
}
