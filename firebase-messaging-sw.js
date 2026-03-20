// Firebase Cloud Messaging Service Worker
// Este archivo DEBE llamarse firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "AIzaSyDnAVx99zf_huCCguQrpFNuE07UrCk8PrA",
  authDomain:        "chulina-app.firebaseapp.com",
  projectId:         "chulina-app",
  storageBucket:     "chulina-app.firebasestorage.app",
  messagingSenderId: "67580631803",
  appId:             "1:67580631803:web:36cd6cce69cf333a2b6e5e"
});

const messaging = firebase.messaging();

// Handle background notifications (cel bloqueado)
messaging.onBackgroundMessage(function(payload) {
  console.log("Notificacion en background:", payload);

  var title = payload.notification?.title || "\u00a1Nuevo pedido Chulina!";
  var body  = payload.notification?.body  || "Tienes un pedido nuevo esperando.";

  self.registration.showNotification(title, {
    body:    body,
    icon:    "/chulina-app/icon-192.png",
    badge:   "/chulina-app/icon-192.png",
    vibrate: [200, 100, 200],
    data:    payload.data || {},
    actions: [
      { action: "ver", title: "Ver pedido" }
    ]
  });
});

// Handle notification click
self.addEventListener("notificationclick", function(event) {
  event.notification.close();
  if (event.action === "ver" || !event.action) {
    event.waitUntil(
      clients.openWindow("/chulina-app/admin.html")
    );
  }
});
