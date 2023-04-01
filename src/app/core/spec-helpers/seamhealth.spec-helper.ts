import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * Finds a nested Component by its selector, e.g. `app-example`.
 * Throws an error if no element was found.
 *
 * @param fixture Fixture of the parent Component
 * @param selector Element selector, e.g. `app-example`
 */
export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return queryByCss(fixture, selector);
}

export function findComponents<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(selector));
}


/**
 * Finds a single element inside the Component by the given CSS selector.
 * Throws an error if no element was found.
 *
 * @param fixture Component fixture
 * @param selector CSS selector
 */
export function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  const debugElement = fixture.debugElement.query(By.css(selector));
  // Fail on null so the return type is always DebugElement.
  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}
