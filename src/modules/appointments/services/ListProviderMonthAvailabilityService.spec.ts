import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailabilityService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe("ListProviderMonthAvailability", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it("should be able to list the month availability from provider", async () => {
    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id",
      date: new Date(2020, 11, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id2",
      date: new Date(2020, 11, 20, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id",
      date: new Date(2020, 11, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id",
      date: new Date(2020, 11, 20, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id3",
      date: new Date(2020, 11, 20, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id",
      date: new Date(2020, 11, 20, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id",
      date: new Date(2020, 11, 20, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id",
      date: new Date(2020, 11, 20, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id",
      date: new Date(2020, 11, 20, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id",
      date: new Date(2020, 11, 20, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: "user",
      user_id: "fake-id",
      date: new Date(2020, 11, 21, 8, 0, 0),
    });

    const spy = jest.spyOn(Date, "now").mockImplementation(() => {
      return new Date(2020, 10, 5).getTime();
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: "user",
      year: 2020,
      month: 12,
    });

    spy.mockClear();

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ])
    );
  });
});
