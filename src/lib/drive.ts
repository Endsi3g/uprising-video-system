// Google Drive API wrapper for organized file storage

import { google } from 'googleapis';

const FOLDER_STRUCTURE = ['À faire', 'En cours', 'Faites', 'Inspiration'] as const;

function getAuth() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!key) throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY not configured');
  const credentials = JSON.parse(key);
  return new google.auth.GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/drive'] });
}

export async function ensureFolderStructure(parentFolderId: string) {
  const auth = getAuth();
  const drive = google.drive({ version: 'v3', auth });
  const folders: Record<string, string> = {};

  for (const name of FOLDER_STRUCTURE) {
    const existing = await drive.files.list({
      q: `name='${name}' and '${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
    });
    if (existing.data.files?.length) {
      folders[name] = existing.data.files[0].id!;
    } else {
      const created = await drive.files.create({
        requestBody: { name, mimeType: 'application/vnd.google-apps.folder', parents: [parentFolderId] },
        fields: 'id',
      });
      folders[name] = created.data.id!;
    }
  }
  return folders;
}

export async function uploadFile(filePath: string, folderId: string, fileName: string) {
  const auth = getAuth();
  const drive = google.drive({ version: 'v3', auth });
  const fs = await import('fs');

  const response = await drive.files.create({
    requestBody: { name: fileName, parents: [folderId] },
    media: { body: fs.createReadStream(filePath) },
    fields: 'id, webViewLink',
  });
  return { id: response.data.id, link: response.data.webViewLink };
}

export async function moveFile(fileId: string, newFolderId: string) {
  const auth = getAuth();
  const drive = google.drive({ version: 'v3', auth });
  const file = await drive.files.get({ fileId, fields: 'parents' });
  const prevParents = (file.data.parents || []).join(',');
  await drive.files.update({ fileId, addParents: newFolderId, removeParents: prevParents });
}
