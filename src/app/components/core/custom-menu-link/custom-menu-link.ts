export const routable: string[] = [
  'Flight',
  'Train',
  'Hotel'
];

export function checkTopLeftMenu(checkTitle): boolean {
  return (checkTitle === 'Download Karcis.co App' ||
    checkTitle === 'Promos' ||
    checkTitle === 'Help Center') ? true : false;
}

export function checkMainMenu(checkTitle): boolean {
  return (checkTitle !== 'Flight' &&
    checkTitle !== 'Hotel' &&
    checkTitle !== 'Train' &&
    checkTitle !== 'Car Rental' &&
    checkTitle !== 'Entertainment') ? true : false;
}

export function checkOtherMenu(checkTitle): boolean {
  return (checkTitle === 'Tix Point' ||
    checkTitle === 'Check Order') ? true : false;
}
