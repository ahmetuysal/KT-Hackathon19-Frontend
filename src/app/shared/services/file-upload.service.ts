import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private storage: AngularFireStorage) {}

  async uploadImage(file: File): Promise<string> {
    if (file.type.split('/')[0] != 'image') return '';

    const path = `images/${new Date().getTime()}_${file.name}}`;
    const uploadTask = this.storage.upload(path, file);
    const ref = this.storage.ref(path);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        return ref.getDownloadURL();
      })
    );
  }
}
