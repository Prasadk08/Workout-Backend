import Owner from "../model/owner.js";


export const uploadImageController = async (req, res) => {
    try {
    if (!req.file) {
      return res.status(400).json({ message: "No image received" });
    }

    const owner = await Owner.findById(req.user.refId);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // multer-s3 gives location (public URL) and key
    const img = {
      url: req.file.location,
      key: req.file.key,
    };

    owner.gymImages.push(img);
    await owner.save();

    return res.status(201).json({
      message: "Image uploaded successfully",
      images: owner.gymImages,
      added: img,
    });
  } catch (e) {
    console.error("uploadOwnerImages:", e);
    return res.status(500).json({ message: "Upload failed", error: e.message });
  }
}