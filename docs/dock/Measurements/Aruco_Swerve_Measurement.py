import cv2
import cv2.aruco as aruco
import numpy as np
from math import *
import matplotlib.pyplot as plt

###########
#   Constantes  #
###########
 
markerLenght = 0.06             #6 cm width

mtx_v1 = np.array([[635.35746725, 0, 330.33237895], [ 0, 636.86233192, 229.39423206], [0, 0, 1]])
disp_v1 = np.array([0.08063491, -0.29704246, 0.00137873, -0.00190106, 0.08985177])

mtx_v2 =  np.array([[505.62638698, 0, 326.44665333], [0, 506.57448647, 228.39570037],[0, 0, 1]])
disp_v2 = np.array([1.55319525e-01, 4.30522297e-02, -2.08579382e-04, -3.47100297e-03, -1.37788831e+00])

start_distance = -40
end_distance = 40
step_distance = 5

distance_tab = []
distance_error_tab = []

##########
#   Variables   #
##########

distance = start_distance

cap = cv2.VideoCapture(0)                                                    #Start the video frame
aruco_dict = aruco.Dictionary_get(aruco.DICT_6X6_250)     #Load the aruco dictionnary
parameters =  aruco.DetectorParameters_create()             #Load aruco parameters
 
while(True):
    
    ret, image = cap.read()                                                       #Take a picture from the video frame    
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)          #Transform the image in grey scale

    corners, ids, rejectedImgPoints = aruco.detectMarkers(gray_image, aruco_dict, parameters=parameters) #List ids and the corners beloning to each marker

    if(isinstance(ids,np.ndarray)):		#If marker detected:
 
        image = aruco.drawDetectedMarkers(image, corners)
        rvec, tvec = aruco.estimatePoseSingleMarkers(corners, markerLenght, mtx_v2, disp_v2)[0:2]
        rvec = rvec[0][0]   #Rotation matrix in radians
        tvec = tvec[0][0]   #Translation matrix in meters

        value = tvec[0]*100
        
    cv2.imshow('frame',image)
    result = cv2.waitKey(1)

    if(result == ord('s')):

        if(isinstance(ids,np.ndarray)):		#If marker detected:
            
            print("Measured swerve = " + str(value) + "cm for "+ str(distance) + "cm.")
            distance_error_tab.append(abs(distance-value))
            distance_tab.append(distance)
            
        else:
            print("No marker detected for " + str(distance) + "cm.")

        distance += step_distance
            
        if(distance > end_distance):
            break
    
    elif(result == ord('q')):
       break
 
cap.release()
cv2.destroyAllWindows()

plt.plot(distance_tab,distance_error_tab,'ro')
plt.xlabel('Ecart reel (en cm)')
plt.ylabel('Erreur absolue sur l\'ecart mesuree (en cm)')
plt.grid()
plt.show()
