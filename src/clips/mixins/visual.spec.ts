/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla 
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */

import { describe, expect, it } from 'vitest';
import { BlurFilter, Sprite, Texture } from 'pixi.js';
import { VisualMixin } from './visual';
import { Keyframe } from '../../models';
import { Clip } from '../clip';

describe('The Visual Clip Mixin', () => {
	it('should have a default state and values should be assignable', () => {
		const VisualClip = VisualMixin(Clip);

		const canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 200;

		const clip = new VisualClip();
		clip.container.addChild(new Sprite(Texture.from(canvas)));
		expect(clip.height).toBe(200);
		expect(clip.width).toBe(100);
		expect(clip.x).toBe(0);
		expect(clip.y).toBe(0);
		expect(clip.scale.x).toBe(1);
		expect(clip.scale.y).toBe(1);
		expect(clip.rotation).toBe(0);
		expect(clip.filters).toBeUndefined();
		expect(clip.alpha).toBe(1);
		expect(clip.position.x).toBe(0);
		expect(clip.position.y).toBe(0);
		expect(clip.translate.x).toBe(0);
		expect(clip.translate.y).toBe(0);

		clip.rotation = 20;
		clip.filters = [new BlurFilter()];
		clip.alpha = 0.8;
		clip.position = 'center';
		clip.scale = 4;

		expect(clip.position.x).toBe('50%');
		expect(clip.position.y).toBe('50%');
		expect(clip.anchor.x).toBe(0.5);
		expect(clip.anchor.y).toBe(0.5);
		expect(clip.x).toBe('50%');
		expect(clip.y).toBe('50%');
		expect(clip.scale.x).toBe(4);
		expect(clip.scale.y).toBe(4);
		expect(clip.alpha).toBe(0.8);

		clip.x = 5;
		clip.y = 4;

		expect(clip.position.x).toBe(5);
		expect(clip.position.y).toBe(4);

		clip.x = new Keyframe([0,1], [0,1]);
		clip.y = new Keyframe([0,1], [0,1]);

		expect(clip.position.x).instanceOf(Keyframe);
		expect(clip.position.y).instanceOf(Keyframe);

		clip.height = 1000;
		clip.width = 2000;

		expect(clip.height).toBe(1000);
		expect(clip.width).toBe(2000);

		clip.height = '30%';
		clip.width = '20%';

		expect(clip.height).toBe('30%');
		expect(clip.width).toBe('20%');

		clip.anchor = 3;

		expect(clip.anchor.x).toBe(3);
		expect(clip.anchor.y).toBe(3);
	});
});