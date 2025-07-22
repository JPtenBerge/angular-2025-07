import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { ngMocks } from 'ng-mocks';

ngMocks.autoSpy('jasmine');

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
