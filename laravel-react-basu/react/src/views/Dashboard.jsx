import PageComponent from "../components/PageComponent";
import DashboardCard from "../components/DashboardCard.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../axios.js";
import TButton from "../components/core/TButton.jsx";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/dashboard`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        return res;
      })
      .catch((error) => {
        setLoading(false);
        return error;
      });
  }, []);

  return (
    <PageComponent title="Dashboard">
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
          <DashboardCard
            title="Total Reservation"
            className="order-1 lg:order-2"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalReservations}
            </div>
          </DashboardCard>
          <DashboardCard
            title="Total Answers"
            className="order-2 lg:order-4"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="text-8xl pb-4 font-semibold flex-1 flex items-center justify-center">
              {data.totalAnswers}
            </div>
          </DashboardCard>
          <DashboardCard
            title="Latest Reservation"
            className="order-3 lg:order-1 row-span-2"
            style={{ animationDelay: '0.2s' }}
          >
            {data.latestReservation && (
              <div>
                <img
                  src={data.latestReservation.image_url}
                  className="w-[240px] mx-auto"
                />
                <h3 className="font-bold text-xl mb-3">
                  {data.latestReservation.title}
                </h3>
                <div className="flex justify-between text-sm mb-1">
                  <div>Create Date:</div>
                  <div>{data.latestReservation.created_at}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Expire Date:</div>
                  <div>{data.latestReservation.expire_date}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Status:</div>
                  <div>{data.latestReservation.status ? "Active" : "Draft"}</div>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <div>Questions:</div>
                  <div>{data.latestReservation.questions}</div>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <div>Answers:</div>
                  <div>{data.latestReservation.answers}</div>
                </div>
                <div className="flex justify-between">
                  <TButton to={`/reservations/${data.latestReservation.id}`} link>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Reservation
                  </TButton>

                  <TButton link>
                    <EyeIcon className="w-5 h-5 mr-2" />
                    View Answers
                  </TButton>
                </div>
              </div>
            )}
            {!data.latestSurvey && (
              <div className="text-gray-600 text-center py-16">
                Your don't have reservations yet
              </div>
            )}
          </DashboardCard>
          <DashboardCard
            title="Latest Answers"
            className="order-4 lg:order-3 row-span-2"
            style={{ animationDelay: '0.3s' }}
          >
            {data.latestAnswers && data.latestAnswers.length > 0 ? (
              <div className="text-left">
                {data.latestAnswers.map((answer) => (
                  <a
                    href="#"
                    key={answer.id}
                    className="block p-2 hover:bg-gray-100/90"
                  >
                    <div className="font-semibold">{answer.reservation.title}</div>
                    <small>
                      Answer Made at:
                      <i className="font-semibold">{answer.end_date}</i>
                    </small>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 text-center py-16">
                You don't have answers yet
              </div>
            )}
          </DashboardCard>
        </div>
      )}
    </PageComponent>
  );
}
