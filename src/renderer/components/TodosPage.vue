<template>
    <div class="text-xs-center">
      <h1>TODOs</h1>
       <v-btn
        color="red lighten-2"
        @click="dialog = true"
        dark
      >
        ADD
      </v-btn>
    <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>

          <v-toolbar-title>Inbox</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-list three-line>
          <template v-for="(item, index) in items">
          

            <v-list-tile
              :key="index"
            >
            

              <v-list-tile-content>
                <v-list-tile-title v-html="item"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < items.lenght" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Add TODO
        </v-card-title>

        <v-card-text>
        </v-card-text>

        <v-divider></v-divider>
         <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="TODO" required v-model="work"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            CANCLE
          </v-btn>
           <v-btn
            color="primary"
            flat
            @click="save()"
          >
            SAVE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialog: false,
        work: '',
        items: [],
      }
    },
    mounted() {
      this.items = this.$electron.ipcRenderer.sendSync('todo-list')
      this.$electron.ipcRenderer.on('todo-list', (event, data) => {
        this.items = data
      })
    },
    methods: {
      save() {
        console.log('save')
        this.dialog = false
        this.$electron.ipcRenderer.send('add-todo', this.work)
      },
    },
  }
</script>