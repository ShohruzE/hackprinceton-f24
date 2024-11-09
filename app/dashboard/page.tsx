"use client";

export default function DashboardHomePage() {
  const createSummary = async () => {
    const response = await fetch("/api/summary", {
      method: "POST",
      body: JSON.stringify({
        text: `patient: ive been feeling a lot of pain in my lower back lately it started maybe three days ago

nurse: i see has the pain been constant or does it come and go

patient: it comes and goes mostly when im moving around too much but sitting still helps a bit

nurse: ok any other symptoms you’ve noticed alongside the pain like tingling numbness or fever

patient: not really no fever or anything but sometimes i feel like a slight tingling sensation down my right leg

nurse: got it and what would you rate the pain on a scale from one to ten with ten being the worst pain imaginable

patient: id say around a seven when im moving but when im sitting it drops to maybe a three

nurse: alright have you taken any medications or tried any remedies for the pain

patient: yeah ive been taking ibuprofen about twice a day and it helps for a few hours

nurse: thank you for sharing this is helpful is there anything specific you would like addressed or any questions you have about your treatment

patient: yeah actually i was wondering if there are any exercises i could do to help relieve it

nurse: yes there are definitely some gentle stretches and exercises i can recommend i’ll make a note to include those for you

patient: thank you that would be great

nurse: no problem i’ll also bring this up with your doctor to see if they have additional recommendations

patient: thank you i appreciate it

nurse: youre welcome just one last thing is there anything else on your mind regarding your health or any other concerns

patient: no i think that’s it just the back pain

nurse: understood well let’s get that noted down and i’ll be back with the information on exercises shortly
`,
      }),
    });
    const data = await response.json();
    console.log(response);
    console.log(data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h1>Dashboard Home Page</h1>
      <button onClick={createSummary}>Create Summary</button>
    </div>
  );
}
