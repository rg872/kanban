import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: 'AIzaSyAJvxcX7DDrA4lPdm0DJVvakYcM57pWfZs',
  authDomain: 'kanban-73135.firebaseapp.com',
  databaseURL: 'https://kanban-73135.firebaseio.com',
  projectId: 'kanban-73135',
  storageBucket: '',
  messagingSenderId: '255056750331'
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
