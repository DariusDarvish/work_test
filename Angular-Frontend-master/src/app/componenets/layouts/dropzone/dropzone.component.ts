import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/services&Validtors/auth.service';
import { UploadService } from 'src/services&Validtors/upload-service.service';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from 'rxjs';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {
  files: any[] = [];
  fileToUpload: File = null;
  DJANGO_SERVER = 'http://127.0.0.1:8000';
  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  constructor(private uploadService: UploadService, private authService: AuthService) {

  }
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }


  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)) + ' ' + sizes[i]);
  }

  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  upload() {
    let files = this.getFiles();
    console.log(files);
    let requests = [];
    files.forEach((file) => {
      let formData = new FormData();

      formData.append('file', file.rawFile, file.name);
      var inputs = { data: formData, location: 'test' }
      requests.push(this.uploadService.upload(inputs));
    });

    concat(...requests).subscribe(
      (res) => {
        console.log(res);
        alert('File uploaded')
      },
      (err) => {
        console.log(err);
      }
    );
  }


  ngOnInit(): void {
  }

}
