import Owner from "../model/owner.js";


export const ownerProfileController = async (req, res) => {
  let data = await Owner.findById(req.user.refId);
  let response = {
    name: data.name,
    gymName: data.gymName,
    phone: data.phone,
    gymLocation: data.gymLocation,
  };
  console.log(response);
  res.status(200).json(response);
};

export const ownerProfileeditController = async (req, res) => {
let data= req.body
  let ownerprofile = await Owner.findById(req.user.refId);

  ownerprofile.name = data.name;
  ownerprofile.gymName = data.gymName;
  ownerprofile.phone = data.phone;
  ownerprofile.gymLocation = data.gymLocation;
  await ownerprofile.save();
  res.status(201).json({message:"Profile updated Successfully"})
};


export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileName = `${uuidv4()}-${req.file.originalname}`;

    // Upload to S3
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    // Construct image URL
    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    // Store URL in MongoDB
    const gym = await Gym.findById(req.params.gymId);
    gym.images.push(imageUrl); // Assume `images` is array in schema
    await gym.save();

    res.status(200).json({ message: "Uploaded successfully", url: imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Error uploading image" });
  }
}