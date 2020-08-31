#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

ESP8266WiFiMulti WiFiMulti;

int analogPin = A0; // potentiometer wiper (middle terminal) connected to analog pin 3                 // outside leads to ground and +5V
int val = 0;  // variable to store the value read
int indicator = 2;

void setup() {
  // put your setup code here, to run once:
   Serial.begin(9600);           //  setup serial
   pinMode(indicator,OUTPUT);
   // set Wifi SSID dan passwordnya
    WiFiMulti.addAP("TIKA21_Extended", "tika2104");
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(1000);
  digitalWrite(indicator,HIGH);
  delay(1000);
  digitalWrite(indicator,LOW);
  val = analogRead(analogPin);  // read the input pin
  Serial.println(val);          // debug value
  // tunggu koneksi Wifi
    if((WiFiMulti.run() == WL_CONNECTED))
    {
        HTTPClient http;

        // ganti dengan URL API Last Feed punyamu sendiri
        http.begin("http://elbicare.co.id:7500/api/findAllTemaBesar");

        // mulai koneksi dan ambil HTTP Header
        int httpCode = http.GET();

        // httpCode akan bernilai negatif bila error
        if(httpCode > 0)
        {
            // cetak httpCode ke Serial
            Serial.printf("[HTTP] GET... code: %d\n", httpCode);

            // bila nilai dari server diterima
            if(httpCode == HTTP_CODE_OK)
            {
                // cetak string json dari server
                String json = http.getString();
                Serial.println(json);
            }

        } else {
            Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }
        // tutup koneksi HTTP
        http.end();
    }
  delay(2000);
}
