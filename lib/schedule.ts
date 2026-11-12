export type TournamentStop = {
  dateLabel: string;
  startDate: string;
  endDate: string;
  name: string;
  location: string;
  locality?: string;
  region?: string;
};

export const TOURNAMENTS: TournamentStop[] = [
  {
    dateLabel: 'Jan 16-17',
    startDate: '2027-01-16',
    endDate: '2027-01-17',
    name: 'Red Zone Elite 7v7',
    location: 'Mesa, AZ',
    locality: 'Mesa',
    region: 'AZ',
  },
  {
    dateLabel: 'Jan 23-24',
    startDate: '2027-01-23',
    endDate: '2027-01-24',
    name: 'Red Zone Elite 7v7',
    location: 'Orange County, CA',
    locality: 'Orange County',
    region: 'CA',
  },
  {
    dateLabel: 'Feb 6-7',
    startDate: '2027-02-06',
    endDate: '2027-02-07',
    name: 'Battle 7v7',
    location: 'Las Vegas, NV',
    locality: 'Las Vegas',
    region: 'NV',
  },
  {
    dateLabel: 'Feb 27-28',
    startDate: '2027-02-27',
    endDate: '2027-02-28',
    name: 'Pylon Mecca I',
    location: 'Mesquite, NV',
    locality: 'Mesquite',
    region: 'NV',
  },
  {
    dateLabel: 'Mar 6-7',
    startDate: '2027-03-06',
    endDate: '2027-03-07',
    name: 'Battle 7v7',
    location: 'San Diego, CA',
    locality: 'San Diego',
    region: 'CA',
  },
  {
    dateLabel: 'Mar 13-14',
    startDate: '2027-03-13',
    endDate: '2027-03-14',
    name: 'Red Zone Elite 7v7 "Spring Break Classic"',
    location: 'San Diego, CA',
    locality: 'San Diego',
    region: 'CA',
  },
  {
    dateLabel: 'Mar 27',
    startDate: '2027-03-27',
    endDate: '2027-03-27',
    name: 'Passing Down 7v7 "Best of the West"',
    location: 'Morgan Hill, CA',
    locality: 'Morgan Hill',
    region: 'CA',
  },
  {
    dateLabel: 'Apr 10-11',
    startDate: '2027-04-10',
    endDate: '2027-04-11',
    name: 'Battle 7v7 Nationals',
    location: 'TBD',
  },
  {
    dateLabel: 'Apr 17-18',
    startDate: '2027-04-17',
    endDate: '2027-04-18',
    name: 'Red Zone 7v7 Elite',
    location: 'Phoenix, AZ',
    locality: 'Phoenix',
    region: 'AZ',
  },
  {
    dateLabel: 'May 1-2',
    startDate: '2027-05-01',
    endDate: '2027-05-02',
    name: 'Red Zone 7v7 Elite Nationals',
    location: 'TBD',
  },
];

export function scheduleJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '2027 National 7v7 Tournament Schedule',
    url: 'https://highintensityfootball.com/schedule',
    numberOfItems: TOURNAMENTS.length,
    itemListElement: TOURNAMENTS.map((stop, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SportsEvent',
        name: stop.name,
        startDate: stop.startDate,
        endDate: stop.endDate,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        sport: '7v7 football',
        organizer: {
          '@type': 'SportsOrganization',
          name: 'High Intensity Football',
          url: 'https://highintensityfootball.com',
        },
        location: stop.locality
          ? {
              '@type': 'Place',
              name: stop.location,
              address: {
                '@type': 'PostalAddress',
                addressLocality: stop.locality,
                addressRegion: stop.region,
                addressCountry: 'US',
              },
            }
          : {
              '@type': 'Place',
              name: 'Location TBD',
            },
      },
    })),
  };
}
