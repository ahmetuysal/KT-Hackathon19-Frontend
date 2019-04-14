import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private storage: AngularFireStorage) {}

  async uploadImage(file: Blob): Promise<string> {
    if (file.type.split('/')[0] != 'image') return '';
    console.log(file);
    const path = `images/${new Date().getTime()}_${file.size}.png`;
    const uploadTask = this.storage.upload(path, file);
    const ref = this.storage.ref(path);

    await uploadTask.snapshotChanges().toPromise();
    return await ref.getDownloadURL().toPromise();
  }
}
