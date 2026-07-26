---
tags:
  - FEATURE
  - WIP
---
# Automatic Image Conversion to Cloud Availability
---
The **AICTCA** feature automatically scans repo for images in the designated images directory and uploads them to any cloud based destinations such that they are made available to all services that link to them.

## Problem this solves
---
The repo that BrainScan is in is assumed to be a any of the following; GitHub Repository, SyncThing Destination/Directory, Google Drive Synced Storage etc. These services either do not allow for the direct linking of images from their end state destinations (GitHub Repo) or do not allow for public access and or limit storage in these locations. 

**AICTCA** solved this issue by requiring such that the user set up a publicly accessible and or authenticated storage mechanism for media content such that any images can then be made accessible even still in the end state of the Connectome presentation solution. It does so by connecting BrainScan to data stoarge services and using their APIs to upload and then provide back a image URL that coresponds to the image within the current repository. 