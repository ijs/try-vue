<template>
  <div>
    <h1>{{ title }}</h1>
    <input v-model="name" placeholder="Enter Your Name"/>
  </div>
</template>

<script>
export default {
  name: "index",
  data (){
    return {
      title: 'Hey',
      name: ''
    }
  },
  methods: {
    setTitle (userName) {
      this.title = 'Hey ' + userName;
    }
  },

  mounted () {
    const bc = new BroadcastChannel('BBBCCC')
    bc.onmessage = (messageEvent) => {
      console.log('messageEvent', messageEvent)
      // If our broadcast message is 'update_title' then get the new title from localStorage
      if (messageEvent.data === 'update_title') {
        // localStorage is domain specific so when it changes in one window it changes in the other
        this.setTitle(localStorage.getItem('title'));
      }
    }

    // When the page loads check if the title is in our localStorage
    if (localStorage.getItem('title')) {
      this.setTitle(localStorage.getItem('title'));
    } else {
      this.setTitle('please tell us your name');
    }
    this.$watch('name', name => {
      localStorage.setItem('title', name)
      bc.postMessage('update_title', name)
    })
  }
}
</script>

<style scoped>

</style>
