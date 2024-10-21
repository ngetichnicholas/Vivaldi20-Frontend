<template>
  <div class="container mt-5">
    <div class="card shadow-lg p-4 mb-5 bg-white rounded">
      <div class="card-body text-center">
        <h2 class="card-title mb-4">Your Profile</h2>
        <div v-if="profile" class="profile-info">
          <img
            :src="profile.profile_photo"
            class="rounded-circle img-thumbnail mb-3"
            alt="Profile Photo"
            width="150"
            height="150"
          />
          <h4 class="card-subtitle mb-2 text-primary">{{ profile.first_name }} {{ profile.last_name }}</h4>
          <p class="card-text">
            <strong>Username:</strong> {{ profile.username }}<br />
            <strong>Profession:</strong> {{ profile.profession }}<br />
            <strong>Bio:</strong> {{ profile.bio }}<br />
          </p>
          <input type="file" @change="onFileChange" class="mt-2" />
          <button class="btn btn-primary mt-2" @click="updateProfilePhoto">Update Profile Photo</button>
          
          <h5 class="mt-4">Edit Your Information</h5>
          <form @submit.prevent="editProfile" class="mt-3">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="username">Username:</label>
                <input type="text" v-model="formData.username" class="form-control" id="username" required />
              </div>
              <div class="form-group col-md-6">
                <label for="first_name">First Name:</label>
                <input type="text" v-model="formData.first_name" class="form-control" id="first_name" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="last_name">Last Name:</label>
                <input type="text" v-model="formData.last_name" class="form-control" id="last_name" required />
              </div>
              <div class="form-group col-md-6">
                <label for="profession">Profession:</label>
                <input type="text" v-model="formData.profession" class="form-control" id="profession" />
              </div>
            </div>
            <div class="form-group">
              <label for="bio">Bio:</label>
              <textarea v-model="formData.bio" class="form-control" id="bio" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-success">Save Changes</button>
          </form>
        </div>
        <div v-else class="alert alert-info mt-4">
          Loading your profile information...
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      profile: null,
      formData: {
        username: '',
        first_name: '',
        last_name: '',
        profession: '',
        bio: ''
      },
      selectedFile: null
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_URL}/members/${userId}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            }
          }
        );
        this.profile = response.data.data;
        this.formData.username = this.profile.username;
        this.formData.first_name = this.profile.first_name;
        this.formData.last_name = this.profile.last_name;
        this.formData.profession = this.profile.profession;
        this.formData.bio = this.profile.bio;
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async updateProfilePhoto() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const formData = new FormData();
      formData.append("profile_photo", this.selectedFile);

      try {
        await axios.patch(
          `${process.env.VUE_APP_API_URL}/members/${userId}/update-profile-photo/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'multipart/form-data',
            }
          }
        );
        this.fetchProfile();
        alert("Profile photo updated successfully!");
      } catch (error) {
        console.error("Error updating profile photo:", error);
        alert("Failed to update profile photo.");
      }
    },
    async editProfile() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        await axios.put(
          `${process.env.VUE_APP_API_URL}/members/${userId}/`,
          this.formData,
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'application/json',
            }
          }
        );
        this.fetchProfile();
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 700px;
  margin: 0 auto;
}

.profile-info img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 3px solid #007bff;
}

.card-subtitle {
  font-size: 1.75rem;
  font-weight: bold;
  color: #007bff;
}

.card-text {
  font-size: 1.2rem;
  margin-top: 15px;
}

.alert {
  font-size: 1.2rem;
}

.form-row {
  margin-bottom: 15px;
}

.btn-primary {
  width: 100%;
}
</style>
