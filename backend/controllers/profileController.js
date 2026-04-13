import User from "../modals/User.js";

export const getProfile = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) return res.status(400).json({ message: "Invalid email id" });

    const user = await User.findOne({ email }).select("-password");

    if (!user) return res.status(400).json({ message: "Invalid email id" });

    return res.status(200).json({ user: user, message: "User found" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error, message: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { email, socialLinks } = req.body;

    if (!email) return res.status(400).json({ message: "Invalid payload" });

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid user" });
    console.log(user);
    if (socialLinks?.linkedin)
      user.social_links.linkedin = socialLinks.linkedin;
    if (socialLinks?.github) user.social_links.github = socialLinks.github;
    if (socialLinks?.portfolio)
      user.social_links.portfolio = socialLinks.portfolio;
    if (socialLinks?.twitter) user.social_links.twitter = socialLinks.twitter;
    if (socialLinks?.dev_to) user.social_links.dev_to = socialLinks.dev_to;
    if (socialLinks?.hashnode)
      user.social_links.hashnode = socialLinks.hashnode;
    if (socialLinks?.medium) user.social_links.medium = socialLinks.medium;

    user.save();
    return res.status(200).json({ message: "User updated " });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error, message: "Internal server error" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Invalid payload" });

    // Find user first to get their ID
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id;

    // Delete all related data
    await Promise.all([
      User.findOneAndDelete({ email }), // Delete user
      Resume.deleteMany({ user_id: userId }), // Delete all resumes
      Post.deleteMany({ user_id: userId }), // Delete all posts
      //   CalendarPost.deleteMany({ user_id: userId }), // Delete calendar posts
      //   ContentStrategy.deleteMany({ user_id: userId }), // Delete strategies
      //   Task.deleteMany({ user_id: userId }), // Delete all tasks
    ]);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error, message: "Internal server error" });
  }
};
