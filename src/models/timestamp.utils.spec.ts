/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla 
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */

import { describe, it, expect } from 'vitest';
import { Timestamp } from '../models';
import { framesToMillis, framesToSeconds, secondsToFrames } from './timestamp.utils';
import type { frame } from '../types';

describe('Timestamp utils', () => {
	it('should be able to convert frames to milliseconds', () => {
		expect(framesToMillis(<frame>10)).toBe(333);
		expect(framesToMillis(<frame>-10)).toBe(-333);
		expect(framesToMillis(<frame>0)).toBe(0);
		expect(framesToMillis(<frame>10, 2)).toBe(5000);
		expect(framesToMillis(<frame>-10, 2)).toBe(-5000);
		expect(framesToMillis(<frame>5, 7)).toBe(714);
		expect(framesToMillis(<frame>8, 9)).toBe(889);
		expect(() => framesToMillis(<frame>8, 0)).toThrowError();
		expect(() => framesToMillis(<frame>8, -1)).toThrowError();
	});

	it('should be able to convert frames to seconds', () => {
		expect(framesToSeconds(<frame>10)).toBe(0.333);
		expect(framesToSeconds(<frame>-10)).toBe(-0.333);
		expect(framesToSeconds(<frame>0)).toBe(0);
		expect(framesToSeconds(<frame>10, 2)).toBe(5);
		expect(framesToSeconds(<frame>-10, 2)).toBe(-5);
		expect(framesToSeconds(<frame>5, 7)).toBe(0.714);
		expect(framesToSeconds(<frame>8, 9)).toBe(0.889);
		expect(() => framesToSeconds(<frame>8, 0)).toThrowError();
		expect(() => framesToSeconds(<frame>8, -1)).toThrowError();
	});

	it('should be able to convert seconds to frames', () => {
		expect(secondsToFrames(0.333)).toBe(10);
		expect(secondsToFrames(-0.333)).toBe(-10);
		expect(secondsToFrames(0)).toBe(0);
		expect(secondsToFrames(5, 2)).toBe(10);
		expect(secondsToFrames(-5, 2)).toBe(-10);
		expect(secondsToFrames(0.714, 7)).toBe(5);
		expect(secondsToFrames(0.889, 9)).toBe(8);
		expect(() => secondsToFrames(8, 0)).toThrowError();
		expect(() => secondsToFrames(8, -1)).toThrowError();
	})

	it('should result in a bidirectional conversion frames - seconds - frames', () => {
		const ts = new Timestamp(77686.86858);
		const seconds = framesToSeconds(ts.frames);
		expect(secondsToFrames(seconds)).toBe(ts.frames);
	});
});