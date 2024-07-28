import { Query } from 'appwrite';
import { databases, storage, ID, } from './appwrite'; // Added Query import
// import cron from 'node-cron';


const scheduleStatusDeletion = (statusId, expiryAt) => {
    const expiryDate = new Date(expiryAt);

    cron.schedule(expiryDate, async () => {
        try {
            await databases.deleteDocument('database_id', 'status', statusId);
            console.log(`Deleted status with ID: ${statusId}`);
        } catch (error) {
            console.error('Failed to delete status:', error);
        }
    });
};

const addStatus = async (phoneNumber, mediaUri='', mediaType, text = '') => {
    const statusId = ID.unique();
    const createdAt = new Date(); // Current date and time
    const expiryAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000); // 24 hours later

    const createdAtISO = createdAt.toISOString();
    const expiryAtISO = expiryAt.toISOString();

    try {


        let mediaUrl = '';

        // If there's a mediaUri, upload the media and get the URL
        if (mediaUri) {
        console.log("media uri: ",mediaUri)

        const fileExtension = mediaUri.split('.').pop().toLowerCase();
        console.log("file extention")
        let mimeType;

        switch (fileExtension) {
            case 'jpg':
            case 'jpeg':
            mimeType = 'image/jpeg';
            break;
            case 'png':
            mimeType = 'image/png';
            break;
            case 'mp4':
            mimeType = 'video/mp4';
            break;
            case 'mov':
            mimeType = 'video/quicktime';
            break;
            case 'mkv':
            mimeType = 'video/x-matroska';
            break;
            default:
            throw new Error('Unsupported media type');
        }

        console.log("file extention: ",fileExtension)
        console.log("mimitype: ",mimeType)

        const formData = new FormData();
        formData.append('fileId', ID.unique());
        formData.append('file', {
            uri: mediaUri,
            name: `status_upload${phoneNumber}_${new Date().getTime()}.${fileExtension}`,
            type: mimeType
        });
        // console.log("formData: ",formData)

        const uploadResponse = await fetch(
            'https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files',
            {
            method: 'POST',
            headers: {
                'X-Appwrite-Project': '66992806000309150f65',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
            }
        );
        console.log("uploaded response: ",uploadResponse)
        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok) {
            throw new Error(uploadData.message || 'Failed to upload media');
        }

        mediaUrl = `https://cloud.appwrite.io/v1/storage/buckets/synk_bucket/files/${uploadData.$id}/view?project=66992806000309150f65`;
        }

        console.log("mediaurl; ",mediaUrl)

       const response = await databases.createDocument('database_id', 'status', statusId, {
            phoneNumber,
            text,
            mediaUrl,
            mediaType,
            viewers: [], 
            createdAt:createdAtISO,
            expiryAt:expiryAtISO,
        });

        return response;
        // scheduleStatusDeletion(statusId, expiryAt);
    } catch (error) {
        console.error("Failed to add status:", error);
    }
};

const viewStatus = async (statusId, viewerPhoneNumber) => {
    try {
        // Fetch the status document
        const status = await databases.getDocument('database_id', 'status', statusId);

        // Update the viewers list
        const viewers = status.viewers || [];
        if (!viewers.includes(viewerPhoneNumber)) {
            const updatedViewers = [...viewers, viewerPhoneNumber];
            await databases.updateDocument('database_id', 'status', statusId, { viewers: updatedViewers });
        }
    } catch (error) {
        console.error('Failed to update status viewers:', error);
    }
};

const getStatuses = async () => {
    try {
      // Fetch all statuses; adjust for pagination if needed
      const response = await databases.listDocuments('database_id', 'status', [
        // No filters here; fetch all statuses
      ]);
      console.log("statuses: ",response.documents)
      return response.documents;
    } catch (error) {
      console.error('Failed to get statuses:', error);
      return [];
    }
};

const getStatusesByPhoneNumber = async (phoneNumber) => {
    try {
      const response = await databases.listDocuments('database_id', 'status', [
        Query.equal('phoneNumber', phoneNumber)
      ]);
      return response.documents;
    } catch (error) {
      console.error('Error fetching statuses by phone number:', error);
      throw error;
    }
  };

export { addStatus, getStatuses,viewStatus,getStatusesByPhoneNumber };
