import { TestBed } from '@angular/core/testing';
import { DownloadLibraryService } from './download-library.service';
import { signal } from '@angular/core';
import { mockBooks } from '../../test-mocks/mock-books';

describe('DownloadLibraryService', () => {
  let service: DownloadLibraryService;
  let mockAnchor: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadLibraryService],
    });
    service = TestBed.inject(DownloadLibraryService);
    mockAnchor = {
      href: '',
      click: jasmine.createSpy('click'),
    };
    spyOn(document, 'createElement').and.returnValue(mockAnchor as any);
    spyOn(document.body, 'appendChild').and.stub();
    spyOn(document.body, 'removeChild').and.stub();
    spyOn(window.URL, 'createObjectURL').and.returnValue('blob:mock-url');
  });

  it('creates service', () => {
    expect(service).toBeTruthy();
  });

  it('should create an anchor element', () => {
    const signalBooks = signal(mockBooks);
    service.convertAndSaveXml(signalBooks);

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(mockAnchor.href).toBe('blob:mock-url');
  });

  it('should trigger a download click', () => {
    const signalBooks = signal(mockBooks);
    service.convertAndSaveXml(signalBooks);

    expect(mockAnchor.click).toHaveBeenCalledTimes(1);
  });

  it('should append and remove child on document body', () => {
    const signalBooks = signal(mockBooks);
    service.convertAndSaveXml(signalBooks);

    expect(document.body.appendChild).toHaveBeenCalledWith(mockAnchor);
    expect(document.body.removeChild).toHaveBeenCalledWith(mockAnchor);
  });
});
