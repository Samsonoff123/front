import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Rating, Skeleton } from "@mui/material";
import Header from "../../Header";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const useStyles = makeStyles(() => ({
  courseCard: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "30px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  courseImage: {
    width: "100%",
    height: 250,
  },
  courseDetails: {
    padding: "20px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  courseName: {
    marginTop: 0,
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#349e5b",
  },
  coursePrice: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#349e5b",
  },
  courseTags: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  tag: {
    backgroundColor: "#349e5b",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "5px 10px",
    borderRadius: "20px",
    marginRight: "10px",
    marginBottom: "10px",
  },
  courseDescription: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#555",
  },
  courseStats: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#555",
  },
  courseViews: {
    display: "flex",
    alignItems: "center",
  },
  courseRating: {
    display: "flex",
    alignItems: "center",
  },
}));

function ProductDetail({isAdmin}) {
  const [course, setCourse] = useState();
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`https://umka-diplom-samsonoff123.vercel.app/api/product/${id}`)
      .then((response) => {
        setCourse(response.data);
      });
  }, []);

  return course ? (
    <>
        <Header isAdmin={isAdmin} pageName="Product page" />
        <div className="main" style={{paddingBottom: 0}}>
          <ProductCart {...course} />
        </div>
    </>
  ) : (
    <div className={classes.courseCard}>
      <div className={classes.courseImage}>
        <Skeleton height={250} variant="rectangular" />
      </div>
      <div className={classes.courseDetails}>
        <div>
          <Skeleton width="60%" height={40} />
          <Skeleton width="30%" height={30} style={{ marginTop: "10px" }} />
          <div className={classes.courseTags}>
            <Skeleton width="20%" height={30} />
            <Skeleton width="20%" height={30} />
            <Skeleton width="20%" height={30} />
          </div>
          <Skeleton height={80} style={{ marginTop: "10px" }} />
        </div>
        <div className={classes.courseStats}>
          <div className={classes.courseViews}>
            <Skeleton width={24} height={24} style={{ marginRight: "5px" }} />
            <Skeleton width={50} height={24} />
          </div>
          <div className={classes.courseRating}>
            <Skeleton width={24} height={24} style={{ marginRight: "5px" }} />
            <Skeleton width={50} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCart(props) {
  const { id, name, price, tag, img, description, views, rating } = props;

  const handleSetRating = (event, value) => {
    event.preventDefault()
    if (value) {
      axios.post(`https://umka-diplom-samsonoff123.vercel.app/api/product/set-rating/${id}`, {
          rating: value
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
       console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })
    }
  }

  return (
      <div className="course-card">
        <div className="course-image">
          <img src={img} alt={name} />
        </div>
        <div className="course-details">
          <h3 className="course-name">{name}</h3>
          <div className="course-price">{price} KZT</div>
          <div className="course-tags">
            {tag?.split(" ")?.map((t, index) => (
              <span key={index} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div className="course-description">{description?.text}</div>
          <div className="course-stats">
            <div className="course-views">
              <RemoveRedEyeOutlinedIcon />
              {views} views
            </div>
            <div className="course-rating">
              Rating:
              <Rating
                style={{ marginTop: "auto" }}
                name="half-rating"
                precision={0.5}
                defaultValue={rating}
                onChange={(event, value) => handleSetRating(event, value)}
              />
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProductDetail;
