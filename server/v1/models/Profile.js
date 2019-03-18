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
        type: String
      },
      location: {
        type: String
      },
      degree: {
        type: String
      },
      fieldOfStudy: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      isCurrent: {
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
        type: String
      },
      company: {
        type: String
      },
      location: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      isCurrent: {
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
      type: Number
    },
    coursesEnrolledIn: [
      {
        name: {
          type: String
        },
        type: {
          type: String,
          max: 30
        },
        number: {
          type: Number
        },
        teacher: {
          firstName: {
            type: String
          },
          lastName: {
            type: String
          }
        }
      }
    ]
  },
  teacherFields: {
    teacherId: {
      type: Number
    },
    coursesTeaching: [
      {
        name: {
          type: String,
          max: 280
        },
        type: {
          type: String,
          max: 30
        },
        number: {
          type: Number
        },
        students: [
          {
            firstName: {
              type: String
            },
            lastName: {
              type: String
            },
            studentId: {
              type: Number
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
