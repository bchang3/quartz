from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from dotenv import load_dotenv
import os
import time
import spotipy
from spotify_player_utils import clearQueue, getDevice, getDeviceID, linebreak, print_playlists
import sys
load_dotenv()

#set up spotify API client
username = "jwpzy3f95b860qvipvqhxmira"
clientID = os.getenv('SPOTIFY_CLIENT_ID',)
clientSecret = os.getenv('SPOTIFY_CLIENT_SECRET',)
redirect_uri = "http://google.com/callback/"
scope = "user-read-playback-state playlist-modify-public user-modify-playback-state streaming app-remote-control playlist-read-collaborative playlist-read-private"
oauth_object = spotipy.SpotifyOAuth(clientID, clientSecret, redirect_uri, scope=scope)
auth_url = oauth_object.get_authorize_url()
print(linebreak)
print(f"Authorize URL: {auth_url}")
print(linebreak)
spotifyClient = spotipy.Spotify(auth_manager=oauth_object)

user_name = spotifyClient.current_user()

print("Devices", spotifyClient.devices()['devices'] )
print(linebreak)

device = getDevice(spotifyClient)
deviceID = getDeviceID(spotifyClient)
if device:
  print(f"WELCOME TO THE PROJECT, {user_name['display_name']}\nCurrent Device: {device['name']}"  )
  print(deviceID)
  # print_playlists(spotifyClient, deviceID)
else:
   print("No device found!")

command_to_playlist = {
    "0x58": "spotify:playlist:09dqjgCuarBiOKInqOKIdF",
    "0x59": "spotify:playlist:1t6z5svHyNX5UXQjjNhZbL",
    "0x45": "spotify:playlist:5NjzcO3AA4l7Gj1q6J7BB9",
    "0x1e": "spotify:playlist:2ULQkcfryzLa5qstM80OBa",
    "0x54": "spotify:playlist:0rR0aqcCvF7yNjaSzj2fWL",
    "0x44": "spotify:playlist:3zPbG7n9W3yc7ZThP3AmUM",
    "0x50":"spotify:playlist:1Ax9cs74TNOOzIjXxtzYSK",
    "0x1a":"spotify:playlist:7IT9hilkrRCozaA0bphpgO",
    "0x5":"spotify:playlist:0RiwgJqHn5gZmAeqq26Rn3",
    "0x41": "close",
    "0x5c": "vol_up",
    "0x5d": "vol_down"
}
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback_default_key')
socketio = SocketIO(app)
port = int(os.getenv('PORT', "3334"))

@app.route('/')
def index():
    return "APT Spotify WebSocket server is running!"

@app.route('/api/play_music', methods=['POST'])
def handle_post_request():
    global spotifyClient
    # Parse the JSON data from the request
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
    
    # Process the data (for example, log it or store it)
    print(linebreak)
    print(f"Received message: {data}")
    response = {}
    if (data.get("action") == "play_music" and data.get("command") in command_to_playlist):
        token = oauth_object.get_cached_token()
        if (not token or token['expires_at'] - time.time() < 60):
          print("refreshing token:")
          token_info = oauth_object.refresh_access_token(token_info['refresh_token'])
          spotifyClient = spotipy.Spotify(auth_manager=oauth_object)
        else:
           spotifyClient = spotipy.Spotify(auth_manager=oauth_object)
           print(f"using cached token {token['access_token']}\n: expires in {int(token['expires_at'] - time.time())} seconds.")

        deviceID = getDeviceID(spotifyClient)
        if (command_to_playlist[data.get("command")].startswith("spotify")):
          spotifyClient.start_playback(deviceID, context_uri=command_to_playlist.get(data.get("command")))
          spotifyClient.shuffle(True, deviceID)
          response = {
            "message": "Starting playlist!",
            "received_data": data
          }
        else:
          if spotifyClient.current_playback():
            device = spotifyClient.current_playback().get("device")
            volume = device.get("volume_percent")
            command = command_to_playlist[data.get("command")]
            if (command == "close"):
              spotifyClient.pause_playback(deviceID)
              response = {
              "message": "Paused playback!",
              "received_data": data
              }
            elif (command == "vol_up"):
              spotifyClient.volume(min(volume + 5, 100))
              response = {
              "message": "Increased volume!",
              "received_data": data
              }
            elif (command == "vol_down"):
              spotifyClient.volume(max(volume - 5, 0))
              response = {
              "message": "Decreased volume!",
              "received_data": data
              }
          else:
             response = {
                "message": "There is no current playback!",
                "received_data": data
             }
        return jsonify(response), 200
    else:
      response = {
          "message": "Action not found!",
          "received_data": data
      }
      
      return jsonify(response), 400

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(host='0.0.0.0', port=port)