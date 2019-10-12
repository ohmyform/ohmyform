<template>
  <div>
    <h1 aria-label="Register">
      <img src="../assets/img/logo_white_small.png" alt="OhMyForm" />
    </h1>

    <b-form class="box" @submit="submit">
      <b-form-group>
        <b-form-input
          id="username"
          v-model="username"
          aria-label="Username"
          trim
          placeholder="Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          id="email"
          v-model="email"
          aria-label="Email"
          trim
          placeholder="Email"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          id="password"
          v-model="password"
          aria-label="Password"
          type="password"
          placeholder="Password"
          trim
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" block variant="primary">Register</b-button>
      <nuxt-link to="/login" class="recover">
        Already have an account? Sign in here
      </nuxt-link>
    </b-form>
  </div>
</template>

<script>
export default {
  layout: 'screen',
  auth: 'guest',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submit() {
      // TODO
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 80%;
  width: 300px;
}
.box {
  margin-top: 60px;
  height: 400px;
  padding-left: 8px;
  padding-right: 8px;
}
.recover {
  display: block;
  padding-top: 15px;
  color: #fff;
  font-size: 14px;
}
</style>
