{
  /* <div style={styles.Cont}>
            <div>
              <p>{user.userName}</p>
              <div className="row">
                <div style={styles.Card}>
                  <div className="card">
                    <div className="card-header">
                      <strong>
                        {profile.isStudent
                          ? "Courses Enrolled In"
                          : "Courses Teaching"}
                      </strong>
                    </div>
                    <div>
                      {profile.isStudent ? (
                        <ProfileSideCourseCard
                          course={profile.studentFields.coursesEnrolledIn}
                        />
                      ) : (
                        <ProfileSideCourseCard
                          course={profile.teacherFields.coursesTeaching}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row" style={styles.Frame}>
                    <video id="videoElement" style={styles.Screen}>
                      No Video Stream.....
                    </video>
                    <video id="ForiegnVid" style={styles.Screen} />
                  </div>
                  <div className="center">
                    <button
                      id="startVideo"
                      onClick={function() {
                        startVideo();
                      }}
                      style={styles.Button}
                    >
                      Start Video
                    </button>
                    <button
                      id="startStream"
                      onClick={function() {
                        startStream();
                      }}
                      style={styles.Button}
                    >
                      Start Stream
                    </button>
                    <button
                      id="stopStream"
                      onClick={function() {
                        stopStream();
                      }}
                      style={styles.Button}
                    >
                      Stop Stream
                    </button>
                    <button
                      id="startRecord"
                      onClick={function() {
                        startRecording();
                      }}
                      style={styles.Button}
                    >
                      Start Recording
                    </button>
                    <button
                      id="stopRecording"
                      onClick={function() {
                        endRecording();
                      }}
                      style={styles.Button}
                    >
                      Stop Recording
                    </button>
                  </div>
                </div>
                <div>
                  <div style={styles.Log} />
                  <div style={styles.Chat} />
                </div>
              </div>
            </div>
          </div> */
}
