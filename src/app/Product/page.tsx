import React from "react";
import content from "../../data/Product/contentSeeMore.json";
import SeeMore from "../../components/Product/SeeMore";
import FAQAccordion from "../../components/Product/FAQAccordion";
import FadData from "../../data/Product/fadData.json";
import "../../styles/Product/SeeMore.css"
import "../../styles/Product/Fad.css"
const getYoutubeEmbed = (url: string) => {
  if (!url) return "";

  // youtu.be/VIDEO_ID
  if (url.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
  }

  // youtube.com/watch?v=VIDEO_ID
  if (url.includes("watch?v=")) {
    return `https://www.youtube.com/embed/${url.split("v=")[1].split("&")[0]}`;
  }

  // đã là embed
  if (url.includes("youtube.com/embed")) {
    return url;
  }

  return url;
};

const renderMedia = (media: { type: string; src: string; } | undefined, alt = "") => {
  if (!media) return null;

  if (media.type === "image") {
    return <img src={media.src} alt={alt} />;
  }

  if (media.type === "video") {
    const isYoutube =
      media.src.includes("youtube.com") ||
      media.src.includes("youtu.be");

    if (isYoutube) {
      return (
        <div className="yt-wrapper">
          <iframe
            src={getYoutubeEmbed(media.src)}
            title={alt || "YouTube video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    }

    // fallback cho video mp4
    return <video controls src={media.src} />;
  }

  return null;
};


export default function ProductContent() {
  return (
    <div className="body">
       <SeeMore maxHeight={700}>
      {content.sections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return (
              <section key={index}>
                <h1>{section.title}</h1>
                <p>{section.description}</p>
              </section>
            );

          case "intro":
            return (
              <section key={index}>
                <h2>{section.title}</h2>
                {section.content?.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </section>
            );

          case "product_list":
            return (
              <section key={index}>
                <h2>{section.title}</h2>
                <ul>
                  {section.items?.map((item, i) => (
                    <li key={i}>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>

                      {renderMedia(item.media, item.name)}
                    </li>
                  ))}
                </ul>
              </section>
            );

          case "guide":
            return (
              <section key={index}>
                <h2>{section.title}</h2>
                <ul>
                  {section.steps?.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>

                {renderMedia(section.media, section.title)}
              </section>
            );

          case "style_guide":
            return (
              <section key={index}>
                <h2>{section.title}</h2>

                {section.groups?.map((group, i) => (
                  <div key={i}>
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>

                    {renderMedia(group.media, group.title)}
                  </div>
                ))}
              </section>
            );

          case "service":
            return (
              <section key={index}>
                <h2>{section.title}</h2>
                {section.content?.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}

                {renderMedia(section.media, section.title)}
              </section>
            );

          case "cta":
            return (
              <section key={index}>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </section>
            );

          default:
            return null;
        }
      })}
    </SeeMore>
    <section className="faq-section">
      <h2 className="faq-title">FAQ – Áo thun ICONDENIM</h2>
      <FAQAccordion />
    </section>
    </div>
  );
}
