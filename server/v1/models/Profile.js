const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    unique: true
  },
  handle: {
    type: String,
    unique: true,
    required: true,
    max: 60
  },
  bio: {
    type: String,
    max: 280
  },
  education: [
    {
      school: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        max: 280
      }
    }
  ],
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        max: 280
      }
    }
  ],
  skills: {
    type: [String],
    required: true
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
    github: {
      type: String
    }
  },
  isStudent: {
    type: Boolean,
    required: true
  },
  studentFields: {
    studentId: {
      type: Number,
      required: true
    },
    coursesEnrolledIn: [
      {
        name: {
          type: String
        },
        type: {
          type: String,
          required: true,
          max: 30
        },
        number: {
          type: Number,
          required: true
        },
        teacher: {
          firstName: {
            type: String
          },
          lastName: {
            type: String,
            required: true
          }
        }
      }
    ]
  },
  teacherFields: {
    teacherId: {
      type: Number,
      required: true
    },
    coursesTeaching: [
      {
        name: {
          type: String,
          required: true,
          max: 280
        },
        type: {
          type: String,
          required: true,
          max: 30
        },
        number: {
          type: Number,
          required: true
        },
        students: [
          {
            firstname: {
              type: String,
              required: true
            },
            lastName: {
              type: String,
              required: true
            },
            studentId: {
              type: Number,
              required: true
            }
          }
        ]
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
