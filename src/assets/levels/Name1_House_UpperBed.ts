import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openName1_House_UpperBedLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	const books1: Sprite = {
		spriteId: 'books1',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 1],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books1_0', 'environment'],
	};
	pawnStore.registerSprite(books1);
	const books2: Sprite = {
		spriteId: 'books2',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 2],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books1_0', 'environment'],
	};
	pawnStore.registerSprite(books2);

	const books3: Sprite = {
		spriteId: 'books3',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 1],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books1_1', 'environment'],
	};
	pawnStore.registerSprite(books3);
	const books4: Sprite = {
		spriteId: 'books4',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 2],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books1_1', 'environment'],
	};
	pawnStore.registerSprite(books4);
	const dresser: Sprite = {
		spriteId: 'dresser',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 2],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['dresser1', 'environment'],
	};
	pawnStore.registerSprite(dresser);
	if (timelineStore.Name1_GaveUp) {
		const Name1: Sprite = {
			spriteId: 'Name1',
			isCharacter: false,
			isAutoInteract: false,
			position: [5, 5],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['1n0', 'Name1'],
		};
		pawnStore.registerSprite(Name1);
	} else {
		const Name1: Sprite = {
			spriteId: 'Name1',
			isCharacter: false,
			isAutoInteract: false,
			position: [5, 5],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['1n2', 'Name1'],
		};
		pawnStore.registerSprite(Name1);
	}

	const Lower: Sprite = {
		spriteId: 'Lower',
		isCharacter: false,
		isAutoInteract: true,
		position: [3, 5],
		interactionName: 'openLevel',
		interactionArgs: ['1', [4, 7, 's']],
	};
	pawnStore.registerSprite(Lower);
};
export default openName1_House_UpperBedLevel;
