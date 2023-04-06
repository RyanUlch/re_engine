/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useLevelStore } from './levelStore';

export const useSpriteStore = defineStore('spriteStore', () => {
	const levelStore = useLevelStore();
	const scale = ref(4);
	// State:
	const spriteList = reactive<
		{
			position: [number, number, string];
			interactionHandler: () => void;
		}[]
	>([]);

	const characterPosition = reactive<[number, number, string]>([5, 3, 's']);
	const screenPosition = reactive<[number, number]>([0, 0]);

	const registerSprite = (startingPosition: [number, number, string], interaction: () => void) => {
		spriteList.push({
			position: [...startingPosition],
			interactionHandler: interaction,
		});
	};

	const deregisterSprite = (spriteIndex: number) => {
		spriteList.splice(spriteIndex, 1);
	};

	const playerMoveListener = (direction: string) => {
		const newPosition: [number, number, string] = [...characterPosition];
		const newScreenPosition: [number, number] = [...screenPosition];
		switch (direction) {
			case 'n':
				--newPosition[0];
				newScreenPosition[0] += 16 * scale.value;
				break;
			case 'e':
				++newPosition[1];
				newScreenPosition[1] -= 16 * scale.value;
				break;
			case 's':
				++newPosition[0];
				newScreenPosition[0] -= 16 * scale.value;
				break;
			case 'w':
				--newPosition[1];
				newScreenPosition[1] += 16 * scale.value;
				break;
		}
		if (!levelStore.isImpassible(newPosition[0], newPosition[1])) {
			characterPosition[0] = newPosition[0];
			characterPosition[1] = newPosition[1];
			screenPosition[0] = newScreenPosition[0];
			screenPosition[1] = newScreenPosition[1];
		}
		console.log(screenPosition);
		characterPosition[2] = direction;
	};

	const characterId = ref('1');

	const playerInteract = () => {
		const facingPosition: [number, number, string] = [...characterPosition];
		switch (facingPosition[2]) {
			case 'n':
				--facingPosition[0];
				break;
			case 'e':
				++facingPosition[1];
				break;
			case 's':
				++facingPosition[0];
				break;
			case 'w':
				--facingPosition[1];
				break;
		}

		const interactingSprite = spriteList.findIndex(
			(sprite) =>
				sprite.position[0] === facingPosition[0] && sprite.position[1] === facingPosition[1],
		);
		if (interactingSprite > -1) {
			if (typeof spriteList[interactingSprite].interactionHandler !== undefined) {
				spriteList[interactingSprite].interactionHandler();
			}
		}
	};

	return {
		spriteList,
		characterPosition,
		characterId,
		screenPosition,
		scale,
		playerMoveListener,
		playerInteract,
		registerSprite,
		deregisterSprite,
	};
});
